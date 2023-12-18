import React, { useState } from 'react'

export const FileSelector = ({accept, id, fileHandle, text}) => {
    const [file, setFile]= useState('')

    function callme(e){
        setFile(e.target.files[0].name)
        fileHandle(e.target.files[0])
    }

  return (
    <div className='file'>
        <label htmlFor={id}>
            {file ? 
            `The file selected was ${file}`
            : text
            }
        </label>
        <input type="file" accept={accept} id={id}
            style={{display:'none'}}
            onChange={callme}
        />
    </div>
  )
}
