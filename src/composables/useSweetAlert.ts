import Swal from "sweetalert2";

export function useSweetAlert() {
  const forbidden = (text: string) => {
    Swal.fire({
      title: "Accion prohibida",
      text: text,
      icon: "warning",
      customClass: {
        container: "high-z-index",
        popup: "high-z-index",
      },
    });
  };

  const confirmation = async () => {
    return Swal.fire({
      title: "Estas seguro?",
      text: "Esta accion es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      customClass: {
        container: "high-z-index",
        popup: "high-z-index",
      },
    }).then((result) => result);
  };

  const deleted = () => {
    Swal.fire({
      title: "Eliminado!",
      text: "El registro ha sido eliminado.",
      icon: "success",
      customClass: {
        container: "high-z-index",
        popup: "high-z-index",
      },
    });
  };

  return {
    forbidden,
    confirmation,
    deleted,
  };
}
