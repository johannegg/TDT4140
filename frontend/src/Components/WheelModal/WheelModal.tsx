import Wheel from "../SpinTheWheel/Wheel";
import "./WheelModal.css";

interface WheelModalProps {
  visibility: boolean;
  onClose: () => void;
  idsAndTitles: Map<string, string>;
  gameTitles: string[];
}

export default function WheelModal(props: WheelModalProps) {
  if (!props.visibility) return null;
  return (
    <div className="wheelModalContainer">
      <div className="wheelContainer">
        <Wheel
          idsAndTitles={props.idsAndTitles}
          gameTitles={props.gameTitles}
        />
      </div>
    </div>
  );
}
