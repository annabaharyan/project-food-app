import Swal from "sweetalert2";
import "../App.css";

export default function notification() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Զամբյուղում է",
    showConfirmButton: false,
    timer: 1500,
  });
}
