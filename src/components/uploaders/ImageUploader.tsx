import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFile, getAllAssets, deleteAsset } from "../../storage-config/functions";

const ImageUploader = ({ storageInitiated, onUpload }) => {
  const [uploads, setUploads] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUpLoading] = useState(false); //
  const [images, setImages] = useState([]); //

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as any,
    onDrop: (acceptedFiles) => {
      setUploads(acceptedFiles);
      setPreviews(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selected = files.slice(0, 4);
    setUploads(selected);
  };

  const uploadAssets = async () => {
    if (storageInitiated && uploads) {
      setUpLoading(true);
      const file_path = location.pathname;
      const assetsUrls = [];

      for (const image of uploads) {
        try {
          const assetUrl = await uploadFile(image, file_path);
          assetsUrls.push(assetUrl);
          console.log("This file was successfully uploaded:", image.name);
        } catch (error) {
          console.error("Error uploading file:", image.name, error);
          setUploadError(`Error uploading file: ${image.name}`);
        }
      }
      getImages();
      setUpLoading(false);
      onUpload(assetsUrls);
      console.log("Assets urls here", assetsUrls);
    }
  };

  const getImages = async () => { //aded this
    const res = await getAllAssets();
    if (res.ok) {
      setImages(res.ok);
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    previews.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [previews]);

  useEffect(() => {    //added this
    if (storageInitiated) {
      setUpLoading(false);
      getImages();
    }
  }, [storageInitiated]);

  const handleDelete = async (url) => {
    deleteAsset(url);
    getImages();
    
  };


  // Render the dropzone input and the upload button
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} onChange={handleImageChange} />
      </div>
      <button onClick={uploadAssets}>Upload</button>
      <div>
          {images.length == 0 && (
            <h3 className="text-center">
              {/* {loading ? "Loading ..." : "No images uploaded yet"} */}
            </h3>
          )}
          <div className="grid grid-cols-3 gap-3">
            {images?.map((image) => (
              <div key={image.id} className="col-span-1">
                <img src={image.url} className="" alt="Image" />
                <p className="text-white">{image.url}</p>

                <button
                  className="my-4"
                  onClick={() => handleDelete(image.url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
    </div>
    
  );
};

export default ImageUploader;

// implementation of uploadFile function from "../../storage-config/functions";
/*
export function uploadFile(file, path) {
  return new Promise((resolve, reject) => {
    // const blob = new Blob([file], { type: file.type });
    const batch_id = Math.random().toString(36).substring(2, 7);
    const uploadChunk = async ({ chunk, order }) => {
      return fileStorageActor.create_chunk(batch_id, chunk, order);
    };

    const asset_reader = new FileReader();
    asset_reader.onload = async () => {
      const asset_unit8Array = new Uint8Array(asset_reader.result);
      const promises = [];
      const chunkSize = 2000000;
      let checksum = 0;

      for (
        let start = 0, index = 0;
        start < asset_unit8Array.length;
        start += chunkSize, index++
      ) {
        const chunk = asset_unit8Array.slice(start, start + chunkSize);
        checksum = updateChecksum(chunk, checksum);
        promises.push(uploadChunk({ chunk, order: index }));
      }

      const chunk_ids = await Promise.all(promises);
      const asset_filename = file.name;
      const asset_content_type = file.type;

      const { ok: asset_url } = await fileStorageActor.commit_batch(
        batch_id,
        chunk_ids,
        {
          filename: asset_filename,
          checksum: checksum,
          content_encoding: { Identity: null },
          content_type: asset_content_type,
        },
        path
      );

      resolve(asset_url);
    };

    asset_reader.onerror = (error) => {
      reject(error);
    };

    asset_reader.readAsArrayBuffer(file);
  });
}
*/



/*<div>
          {images.length == 0 && (
            <h3 className="text-center">
              {loading ? "Loading ..." : "No images uploaded yet"}
            </h3>
          )}
          <div className="grid grid-cols-3 gap-3">
            {images?.map((image) => (
              <div key={image.id} className="col-span-1">
                <img src={image.url} className="" alt="Image" />
                <p className="text-white">{image.url}</p>

                <button
                  className="my-4"
                  onClick={() => handleDelete(image.url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        
        const imageHandler = useCallback(() => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(true);

      // Upload the image and get the URL
      const filePath = '/path/to/upload'; // Update this path as needed
      const imageUrl = await uploadFile(file, filePath);

      // Insert the image URL into the editor
      editor.insertEmbed(range.index, 'image', imageUrl);
    };
  }, []);

        
        */