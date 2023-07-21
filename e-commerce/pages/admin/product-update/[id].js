import withAdminLayout from "@/components/withAdminLayout";
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'


function ProductUpdate() {
    const router = useRouter();
    const { id } = router.query;

    const elRefs = useRef([]);
    const [isValid, setIsValid] = useState(false);
    const [inputs, setInputs] = useState({
        imageUrls: [""],
        isActive: true,
        sellerId: "",
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (router.isReady) {
            getCategories();
            getProductById();
        }
    }, [router.isReady]);


    useEffect(() => {
        checkValidations();
    }, [inputs])

    async function getProductById() {

        const result = await axios.post("/api/admin/products/getById", { id: id });
        setInputs(result.data);

    }


    const handleSubmit = (event) => {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

        if (isValid) {
            update();
        } else {
            for (let key in elRefs.current) {
                if (!elRefs.current[key].validity.valid) {
                    elRefs.current[key].classList.add("is-invalid");
                    elRefs.current[key].classList.remove("is-valid");
                }
            }
        }
    };

    async function getCategories() {
        const result = await axios("/api/admin/categories/getAll");
        setCategories(result.data);
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setInputs((prev) => ({ ...prev, [name]: value }));

        if (!e.target.validity.valid) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        } else {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        }


    }

    function checkValidations() {
        if (
            elRefs.current["name"]?.validity.valid &&
            elRefs.current["categoryId"]?.validity.valid &&
            elRefs.current["stock"]?.validity.valid &&
            elRefs.current["price"]?.validity.valid &&
            elRefs.current["mainImageUrl"]?.validity.valid
        ) {
            setIsValid(true);
            console.log("valid");
        } else {
            setIsValid(false);
            console.log("novalid");
        }
    }

    async function update() {
        inputs["price"] = inputs["price"].toString().replace(",", ".");
        const seller = JSON.parse(localStorage.getItem("seller"));
        inputs["sellerId"] = seller._id;
        await axios.post("/api/admin/products/update", inputs);
        router.push("/admin/products");
    }

    function removeImg(index) {
        const newImg = inputs["imageUrls"].filter((f, i) => i != index);
        setInputs((prev) => ({ ...prev, ["imageUrls"]: newImg }));
    }

    function newAddImg() {
        const newImage = [...inputs["imageUrls"]];
        newImage.push("");
        setInputs((prev) => ({ ...prev, ["imageUrls"]: newImage }));
    }

    function setValueImg(e, index) {
        const newImageFileds = inputs["imageUrls"].map((val, i) => {
            if (i === index) return e.target.value;
            else return val;
        });
        setInputs((prev) => ({ ...prev, ["imageUrls"]: newImageFileds }));
    }







    return (
        <>
            <div className="container row text-center mx-auto mt-5">
                <div className="mx-auto  col-12 border p-5  rounded mt-5">
                    <form
                        className="row g-3"
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    // ref={(ref) => (elRefs.current["form"] = ref)}
                    >
                        <div className="form-floating col-sm-12   mb-3">
                            <input
                                onChange={handleChange}
                                value={inputs["name"] || ""}
                                className="form-control"
                                name="name"
                                id="name"
                                type="text"
                                required
                                minLength="3"
                                ref={(ref) => (elRefs.current["name"] = ref)}
                            />
                            <label htmlFor="name">Ürün ismi </label>
                            <div className="invalid-feedback">
                                Geçerli bir ürün ismi giriniz
                            </div>
                        </div>

                        <div className="form-floating col-sm-4 mb-3">
                            <select
                                className="form-control"
                                name="categoryId"
                                id="categoryId"
                                onChange={handleChange}
                                value={inputs["categoryId"] || ""}
                                required
                                ref={(ref) => (elRefs.current["categoryId"] = ref)}
                            >
                                <option value="">..</option>
                                {categories.map((val, index) => (
                                    <option key={index} value={val._id}>
                                        {val.name}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="categoryId">Kategori</label>
                            <div className="invalid-feedback">Seçim yapınız</div>
                        </div>

                        <div className="form-floating col-sm-4  mb-3 ">
                            <input
                                onChange={handleChange}
                                value={inputs["stock"] || ""}
                                className="form-control"
                                name="stock"
                                id="stock"
                                type="number"
                                required
                                ref={(ref) => (elRefs.current["stock"] = ref)}
                            />
                            <label htmlFor="stock">Stock Adedi </label>
                            <div className="invalid-feedback">
                                Geçerli bir stock adedi giriniz
                            </div>
                        </div>
                        <div className="form-floating col-sm-4   mb-3">
                            <input
                                onChange={handleChange}
                                value={inputs["price"] || ""}
                                className="form-control"
                                name="price"
                                id="price"
                                type="text"
                                required
                                min={0}
                                ref={(ref) => (elRefs.current["price"] = ref)}
                            />
                            <label htmlFor="price">Birim Fiyatı </label>
                            <div className="invalid-feedback">Geçerli bir fiyat giriniz</div>
                        </div>

                        <div className="form-floating col-sm-12   mb-3 ">
                            <input
                                onChange={handleChange}
                                value={inputs["mainImageUrl"] || ""}
                                className="form-control "
                                name="mainImageUrl"
                                id="mainImageUrl"
                                type="text"
                                required
                                ref={(ref) => (elRefs.current["mainImageUrl"] = ref)}
                            />
                            <label htmlFor="mainImageUrl">Ürünün Kapak Resmi </label>
                            <div className="invalid-feedback">
                                {" "}
                                Ürüne ait geçerli bir kapak resmi girin
                            </div>
                        </div>
                        {inputs["imageUrls"].map((val, index) => {
                            return (
                                <div
                                    key={index}
                                    className="d-flex justify-content-center   align-items-center "
                                >
                                    <div className="form-floating col-sm-2  border mb-3 imageUrlsDiv p-2  ">
                                        {val != "" ? <img src={val} alt="Ürün Resmi" /> : ""}
                                    </div>

                                    <div className="form-floating col-sm-8   mb-3  mx-3">
                                        <input
                                            className="form-control "
                                            type="text"
                                            value={val}
                                            onChange={(e) => setValueImg(e, index)}
                                        />
                                        <label htmlFor="imageUrls">Ürünün Resmi </label>
                                    </div>
                                    <div className="form-floating col-sm-1  my-auto  ">
                                        <button
                                            className=" btn btn-danger  theme br   my-auto "
                                            type="button"
                                            onClick={() => removeImg(index)}
                                        >
                                            x
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="form-floating col-sm-12  my-auto ">
                            <button
                                className="btn btn-primary theme  "
                                type="button"
                                onClick={newAddImg}
                            >
                                <i> + yeni resim ekle </i>
                            </button>
                        </div>
                        <div className="form-floating col-sm-12  my-auto ">
                            <button className="theme   p-2 mt-5 w-50 " type="submit">
                                update
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default withAdminLayout(ProductUpdate);




