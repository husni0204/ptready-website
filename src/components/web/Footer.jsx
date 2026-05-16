// import React from 'react'

const footer = () => {
    return (
        <footer>
            <div className="container-fluid footer-top bg-secondary">
                <div className="row p-4">
                    <div className="col-md-4 mb-4 mt-3">
                        <div className="d-flex justify-content-start gap-2">
                            <img src="/images/logo_ready.png" width="30" />
                        <h5>
                            TENTANG
                            <strong style={{ color: '#ffd22e' }}> PT READY INDUSTRIES INDONESIA</strong>
                        </h5>
                        </div>
                        <hr />
                        <p className="text-justify mt-3">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum eaque, dicta laborum quaerat cumque voluptatem.
                        </p>
                    </div>
                    <div className="col-md-4 mb-4 mt-3">
                        
                    </div>
                    <div className="col-md-4 mb-4 mt-3">
                        <h5>
                            KONTAK <strong style={{ color: '#ffd22e' }}>KAMI</strong>
                        </h5>
                        <hr />
                        <p>
                            <i className="fa fa-map-marker"></i> Kampung Bangkong Reang, Desa/Kelurahan Wangunharja, Kec. Cikarang Utara, Kab. Bekasi, Provinsi Jawa Barat
                            <br />
                            
                            <i className="fas fa-envelope"></i> marketing@ready-id.co.id
                            <br />
                            
                            <i className="fas fa-phone"></i> +62 852-1112-1118
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-fluid footer-bottom bg-primary">
                <div className="row p-3">
                    <div className="text-center text-white font-weight-bold">
                        Copyright © {new Date().getFullYear()} PT Ready Industries Indonesia. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default footer;
