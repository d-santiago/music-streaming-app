import axios from 'axios';
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
  const [songName,setSongName] = useState(""); 
  const [uploadVisible, setUploadVisible] = useState(true);
  const [genre,setGenre] = useState("");
  const [url,setUrl] = useState("");
  const [publisherName,setPublisherName] = useState("");
  const [insertId, setInsertId] = useState("");

  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async (file) => {
      uploadFile(file, config)
          .then(data => setUrl(data))
          .catch(err => console.error(err))
          setUploadVisible(false);
  }
  
  const handleSubmission = (e) => {
    e.preventDefault()
    let values = {
        songName : songName,
        genre : genre,
        recordLabel:publisherName,
        isSignle:true,

    }
    axios.post("artist/createSong",values).then(response => {
      setInsertId(response.data.insertedId);
      console.log(insertId)
    })
    let v = {
      songURL : url.location,
      sid : insertId,
    }
    axios.put("artist/uploadSongData",v).then(response => {
      console.log(response.data);
    })
    

  } 
  
  const uploadButton = (
    <div>
      <div>upload song file</div>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => handleUpload(selectedFile)}> Upload </button>
    </div>
  )
  const songForm  =  (
    <form>
    <h1>Song Info</h1>
    <p>Title Track</p>
    <input
      type='text'
      name='name'
      value={songName}
      onChange={(e) => setSongName(e.target.value)}
    />
    
    <p>Record Label Name</p>
    <input
      type="text"
      name='name'
      value={publisherName}
      onChange={(e) => setPublisherName(e.target.value)}
    />
    <p>Genre</p>
    <input
      type="text"
      name='name'
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    />

    <button onClick = {handleSubmission}>submit info</button>
    </form>
 );
  

  return (

    <div>
      {uploadVisible ? uploadButton : null }
      {!uploadVisible ? songForm : null}
      <p>{url.location}</p>

   </div>
  ) 
}


export default Upload;