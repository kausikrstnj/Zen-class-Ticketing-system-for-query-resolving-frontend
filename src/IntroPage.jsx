import React from 'react'
import './IntroPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function IntroPage() {
    return (
        <>
            <div className="intro-page">

                <main>
                    <div className='intro-container'>
                        <section className="welcome">
                            <h1>Welcome to Zenclass Ticketing System</h1>
                            <p>Resolve your queries and get assistance quickly with our ticketing system.</p>

                        </section>
                    </div>
                    <div className="container px-4 py-5">

                        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
                            <div className="col d-flex flex-column align-items-start gap-2">
                                <h2 className="fw-bold text-body-emphasis">Resolve Queries Quickly with Zenclass Ticketing System</h2>
                                <p className="text-body-secondary">Efficiently handle and resolve customer queries with our advanced ticketing system. Streamline communication, track progress, and provide timely solutions to ensure customer satisfaction.</p>
                                <Link className={"btn btn-primary btn-lg"} to="/signup">Get Started</Link>

                            </div>

                            <div className="col">
                                <div className="row row-cols-1 row-cols-sm-2 g-4">
                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3" style={{ padding: '5px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                                                <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1" />
                                            </svg>
                                        </div>
                                        <h4 className="fw-semibold mb-0 text-body-emphasis">Efficient Query Management</h4>
                                        <p className="text-body-secondary">Organize and prioritize incoming queries to ensure efficient handling and resolution.</p>
                                    </div>

                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3" style={{ padding: '5px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                                                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                                            </svg>
                                        </div>
                                        <h4 className="fw-semibold mb-0 text-body-emphasis">Customizable Ticket Categories</h4>
                                        <p className="text-body-secondary">Create customizable ticket categories to streamline ticket assignment and resolution processes.</p>
                                    </div>

                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3" style={{ padding: '5px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                                                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                                                <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
                                            </svg>
                                        </div>
                                        <h4 className="fw-semibold mb-0 text-body-emphasis">Fast Response Time</h4>
                                        <p className="text-body-secondary">Respond to queries promptly and efficiently to ensure high customer satisfaction and retention.</p>
                                    </div>

                                    <div className="col d-flex flex-column gap-2">
                                        <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3" style={{ padding: '5px' }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 2h-4v3h4zm0 4h-4v3h4zm0 4h-4v3h3a1 1 0 0 0 1-1zm-5 3v-3H6v3zm-5 0v-3H1v2a1 1 0 0 0 1 1zm-4-4h4V8H1zm0-4h4V4H1zm5-3v3h4V4zm4 4H6v3h4z" />
                                            </svg>
                                        </div>
                                        <h4 className="fw-semibold mb-0 text-body-emphasis">Detailed Reporting</h4>
                                        <p className="text-body-secondary">Generate detailed reports and analytics to track performance and identify areas for improvement.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>

                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap" /></svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-body-secondary">&copy; 2024 Company, Inc</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <ul className="example-2">
                            <li className="icon-content">
                                <a
                                    href="https://www.linkedin.com/in/kausik-mohan-929825266/"
                                    aria-label="LinkedIn"
                                    data-social="linkedin"
                                    target='_blank'
                                >
                                    <div className="filled"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-linkedin"
                                        viewBox="0 0 16 16"
                                        xml:space="preserve"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </a>
                                <div className="tooltip">LinkedIn</div>
                            </li>
                            <li className="icon-content">
                                <a href="https://github.com/kausikrstnj" aria-label="GitHub" data-social="github" target='_blank'>
                                    <div className="filled"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-github"
                                        viewBox="0 0 16 16"
                                        xml:space="preserve"
                                    >
                                        <path
                                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </a>
                                <div className="tooltip">GitHub</div>
                            </li>
                            <li className="icon-content">
                                <a
                                    href="https://www.instagram.com/"
                                    aria-label="Instagram"
                                    data-social="instagram"
                                    target='_blank'
                                >
                                    <div className="filled"></div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-instagram"
                                        viewBox="0 0 16 16"
                                        xml:space="preserve"
                                    >
                                        <path
                                            d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </a>
                                <div className="tooltip">Instagram</div>
                            </li>

                        </ul>

                    </ul>
                </footer>
            </div>
        </>
    )
}

export default IntroPage