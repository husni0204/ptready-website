import LayoutWeb from '../../../layouts/Web';

const WebVisimisi = () => {
    return (
        <LayoutWeb>
            <div className="container mt-4 mb-3">
            <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i class="fa-solid fa-people-robbery"></i> VISI PERUSAHAAN
                        </h5>
                        <hr />
                        <div class="card mb-3">
                        <img src="/images/image1.png" class="card-img-top" alt="/images/bg_new.png" />
                        <div class="card-body">
                            <h5 class="card-title">Visi Kami</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <h5 className="text-uppercase">
                            <i class="fa-solid fa-people-carry-box"></i> Misi PERUSAHAAN
                        </h5>
                        <hr />
                        <div class="card mb-3">
                        <img src="/images/image2.png" class="card-img-top" alt="/images/bg_new.png" />
                        <div class="card-body">
                            <h5 class="card-title">Visi Kami</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutWeb>
    )
}

export default WebVisimisi