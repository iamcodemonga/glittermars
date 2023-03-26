import CartBar from "@/components/CartBar";
import Form from "@/components/forms/UploadForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Searchbar";

const upload = () =>  {
    return (
        <>
            <SearchBar />
            <CartBar />
            <Navbar />
            <Form />
            <Footer />
        </>
    );
}

export default upload