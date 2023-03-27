import { MdCheck } from "react-icons/md";

export default function SuccessAlert(message: string | undefined) {
  return (
    <div className="popup" style={{ backgroundColor: "green" }}>
      <strong>
        <MdCheck />
        {message}
      </strong>
    </div>
  )
}