import { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import * as THREE from 'three';

interface CompressionSupport {
  draco: boolean;
  ktx2: boolean;
  meshopt: boolean;
}

interface UseCompressedAssetsOptions {
  enableDraco?: boolean;
  enableKTX2?: boolean;
  enableMeshopt?: boolean;
  dracoDecoderPath?: string;
  ktx2DecoderPath?: string;
}

const DEFAULT_OPTIONS: UseCompressedAssetsOptions = {
  enableDraco: true,
  enableKTX2: true,
  enableMeshopt: true,
  dracoDecoderPath: 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/',
  ktx2DecoderPath: 'https://unpkg.com/three@0.158.0/examples/jsm/libs/basis/',
};

export const useCompressedAssets = (options: UseCompressedAssetsOptions = {}) => {
  const [support, setSupport] = useState<CompressionSupport>({
    draco: false,
    ktx2: false,
    meshopt: false,
  });
  const [isReady, setIsReady] = useState(false);

  const finalOptions = { ...DEFAULT_OPTIONS, ...options };

  useEffect(() => {
    const checkSupport = async () => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) {
        console.warn('WebGL2 not supported, falling back to basic loading');
        setIsReady(true);
        return;
      }

      const newSupport: CompressionSupport = {
        draco: finalOptions.enableDraco ?? false,
        ktx2: finalOptions.enableKTX2 ? checkKTX2Support(gl) : false,
        meshopt: finalOptions.enableMeshopt ?? false,
      };

      setSupport(newSupport);
      setIsReady(true);
    };

    checkSupport();
  }, [finalOptions.enableDraco, finalOptions.enableKTX2, finalOptions.enableMeshopt]);

  const checkKTX2Support = (gl: WebGL2RenderingContext): boolean => {
    const extensions = [
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_compressed_texture_etc',
      'WEBGL_compressed_texture_astc',
      'EXT_texture_compression_bptc',
    ];

    return extensions.some(ext => gl.getExtension(ext) !== null);
  };

  const createOptimizedLoader = () => {
    const loader = new GLTFLoader();

    if (support.draco && finalOptions.enableDraco) {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(finalOptions.dracoDecoderPath!);
      dracoLoader.setDecoderConfig({ type: 'js' });
      loader.setDRACOLoader(dracoLoader);
    }

    if (support.ktx2 && finalOptions.enableKTX2) {
      const renderer = new THREE.WebGLRenderer();
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath(finalOptions.ktx2DecoderPath!);
      ktx2Loader.detectSupport(renderer);
      loader.setKTX2Loader(ktx2Loader);
    }

    if (support.meshopt && finalOptions.enableMeshopt) {
      loader.setMeshoptDecoder(MeshoptDecoder);
    }

    return loader;
  };

  const loadModel = async (url: string) => {
    if (!isReady) {
      throw new Error('Compression support check not completed');
    }

    const loader = createOptimizedLoader();
    
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          // Optimize materials for better performance
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material instanceof THREE.MeshStandardMaterial) {
                // Enable texture compression if available
                if (child.material.map) {
                  child.material.map.generateMipmaps = false;
                  child.material.map.minFilter = THREE.LinearFilter;
                }
              }
            }
          });
          
          resolve(gltf);
        },
        (progress) => {
          console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
        },
        (error) => {
          console.error('Error loading model:', error);
          reject(error);
        }
      );
    });
  };

  return {
    support,
    isReady,
    loadModel,
    createOptimizedLoader,
  };
};

// Hook for preloading models
export const usePreloadModel = (url: string, options?: UseCompressedAssetsOptions) => {
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { loadModel, isReady } = useCompressedAssets(options);

  useEffect(() => {
    if (!isReady) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedModel = await loadModel(url);
        setModel(loadedModel);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [url, isReady, loadModel]);

  return { model, loading, error };
};