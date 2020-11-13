const categoryColors = {
  poetry: "rgb(255,59,48)",
  novel: "rgb(0,113,164)",
  else: "rgb(255,179,64)",
};

const TagRow = ({ tags }) => {
  console.log(tags);
  return (
    <div className='tags-container'>
      {tags.map((tag, ind) => {
        <span
          key={ind}
          className='tag'
          style={{ backgroundColor: categoryColors[tag.name] }}>
          {tag.name.toUpperCase()}
        </span>;
      })}
    </div>
  );
};

export default TagRow;
