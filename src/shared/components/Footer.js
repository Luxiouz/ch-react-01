import React from 'react'

export default function Footer() {
    return (
        <footer className="text-center text-white" style={{backgroundColor: "#f1f1f1"}}>
            <div className="container pt-4">
                <section className="mb-4">
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="bi bi-facebook"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="bi bi-twitter"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="bi bi-google"></i>
                    </a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="bi bi-instagram"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="bi bi-linkedin"></i></a>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="https://github.com/Luxiouz/ch-react-01"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i class="bi bi-github"></i></a>
                </section>
            </div>

            <div className="text-center text-dark p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                ©2020 Copyright:&nbsp;
                <a className="text-dark" href="https://github.com/Luxiouz/ch-react-01">Home Office Store</a>
            </div>
        </footer>
    )
}
