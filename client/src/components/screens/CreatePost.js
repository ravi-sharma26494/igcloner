import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import M from 'materialize-css';
import { BACKENDURL } from "../../utils/utils";

const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [postimage, setPostImage] = useState("");

  useEffect(()=>{
    async function uploadPosts(){
      if(postimage){
        const uploadData = await fetch(`${BACKENDURL}/createpost`, {

          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem('jwt')
          },
          body: JSON.stringify({
            title: title,
            body: body,
            pic:postimage
          })

        });
        const data = await uploadData.json();
        if(data.error){
          return M.toast({html:data.error, classes:"#e57373 red lighten-2"})
        } else{
          M.toast({html:'Upload Successful', classes:'#81c784 green lighten-2'})
          navigate('/')
        }
      }   
    };
    uploadPosts();
    // if(postimage){
    //   fetch(`${BACKENDURL}/createpost`, {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": "Bearer "+ localStorage.getItem('jwt')
    //     },
    //     body: JSON.stringify({
    //       title: title,
    //       body: body,
    //       pic:postimage
    //     })
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       // console.log(data)
    //       if(data.error){
    //         return M.toast({html:data.error, classes:"#e57373 red lighten-2"})
    //       } else{
    //         M.toast({html:'Upload Successful', classes:'#81c784 green lighten-2'})
    //         navigate('/')
    //       }
    //     })
    //     .catch(err=>{
    //       console.log(err)
    //     })
    
  },[postimage]);   
  const postDetails = async()=>{
    // console.log(image)
    const data = new FormData();
    data.append('file',image);
    data.append('upload_preset',"instagramclone");
    data.append('cloud_name',"ravisharma");

   const fetchedData =  await fetch("https://api.cloudinary.com/v1_1/ravisharma/image/upload",{
      method:'post',
      body:data
    });
    const response = await fetchedData.json();
    // console.log(response);
    await setPostImage(response.secure_url);
    // .then(res=> res.json())
    //   .then(data=>{
    //     // console.log(data.url)
    //     setPostImage(data.url);
    //     // console.log(`I have saved the url as ===>: ${postimage}`)
    // }).catch((err)=> console.log(err));
    
  }
  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn #4fc3f7 light-blue lighten-2">
          <span>Choose a File</span>
          <input type="file" onChange={(e)=> setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn waves-effect waves-light #4fc3f7 light-blue lighten-2"
        onClick={()=> postDetails()}
      >
        Submit post
      </button>
    </div>
  );
};

export default CreatePost;
