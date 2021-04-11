export const CarouselItem = ({ item }) => {
  <style>
    {`.custom-tag {
              max-width: 100%;
              height: 500px;      
              background-size: cover;
              background-position: center center;
            }
            h3{
              color:white;
              fontWeight:bold;
            }
            .sr-only{
              display:none;
            }

            @media screen and (max-width:900px){
              .custom-tag{
               height:300px;
              }
            }
            `}
  </style>;
  return (
    <div className='custom-tag'>
      <a href={item.link}>
        <div
          style={{
            height: windowWidth > 900 ? "500px" : "300px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Image
            src={item.src}
            layout='fill'
            alt='banner'
            quality={100}
            width={item.width}
            height={item.height}
          />
        </div>
      </a>
      <h1
        className='text-white'
        captionText={item.description}
        captionHeader={item.title}
      />
    </div>
  );
};
