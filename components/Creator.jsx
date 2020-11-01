import React from "react";

const Creator = () => {
  return (
    <form className='editor'>
      <div className='input-container'>
        <div className='input-group input-group-sm'>
          <div className='input-group-text'>
            <span className='input-group-text title'>标题 :</span>
          </div>
          <input type='text' className='form-control' />
        </div>
        <div className='input-group input-group-sm '>
          <div className='input-group-text'>
            <span className='input-group-text'>图片🔗</span>
          </div>
          <input type='text' className='form-control' />
        </div>
        <div className='form-group text-center'>
          <input
            type='file'
            class='form-control-file ml-5'
            id='exampleFormControlFile1'
          />
        </div>
        <div className='btn-container'>
          <button className='btn btn-danger'>删除</button>
          <button className='btn btn-primary'>保存</button>
          <button className='btn btn-dark'>发布</button>
        </div>
      </div>
      <div className='article'>
        <textarea placeholder='在此处输入内容...'></textarea>
      </div>
    </form>
  );
};

export default Creator;
