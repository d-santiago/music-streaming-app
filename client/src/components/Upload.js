import React , {useState} from 'react';
import { uploadFile } from 'react-s3';

const S3_BUCKET ='myashamusic';
const REGION ='us-east-2';
const ACCESS_KEY ='AKIAVVDASVJEUQAOB4FZ';
const SECRET_ACCESS_KEY ='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';


const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}


const Upload = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [data,setData] = useState("");
  
  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file) => {
      uploadFile(file, config)
          .then(data => setData(data))
          .catch(err => console.error(err))
  }
  console.log(data);

 
  

  return (
    <div>
      <div>upload song file</div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
  </div>
  ) 
}


export default Upload;