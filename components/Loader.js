import MoonLoader from "react-spinners/MoonLoader"

const Loader = ({ loading }) => {
  return (
    <section className="vh-100 w-100 d-flex justify-content-center align-items-center" style={{background: "#f3dcd1", opacity: "0.5"}}>
        <MoonLoader color="#3c0000" loading={loading} size={30} />
    </section>
  )
}

export default Loader