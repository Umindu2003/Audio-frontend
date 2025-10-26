import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images || [];
    console.log(images);
    const [selectedImage, setSelectedImage] = useState(images[0] || "");
    
    if (!images || images.length === 0) {
        return <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center bg-secondary text-textColor font-vintage border-2 border-border rounded-lg">No images available</div>;
    }
    
    return(
        <div className="w-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-full h-[300px] md:h-[500px] object-cover rounded-lg border-4 border-border shadow-vintage-lg"/>
            <div className="w-full mt-[20px] h-[90px] flex justify-center items-center gap-2">
                {
                    images.map((image,index)=>{
                        return <img 
                            key={index} 
                            src={image} 
                            alt="product" 
                            className={`w-[70px] h-[70px] object-cover cursor-pointer rounded-md border-2 transition-all duration-300 ${
                                image == selectedImage 
                                    ? "border-accent shadow-vintage-lg scale-110" 
                                    : "border-border hover:border-highlight hover:scale-105"
                            }`} 
                            onClick={()=>{
                                setSelectedImage(image);
                            }}
                        />
                    })
                }
            </div>

        </div>
    )
}