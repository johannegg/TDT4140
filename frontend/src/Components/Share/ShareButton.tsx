import { IoIosShareAlt } from "react-icons/io";


interface ShareButtonProps {
    gameId: number;
}

const ShareButton = ({
    gameId,
}: ShareButtonProps) => {

    


    return (
        <IoIosShareAlt 
            onClick={(event) => {
            }}
            size={30}
            style={{ cursor: "pointer" }}
        />
    );
};

export default ShareButton;