import React from 'react'

export default function LoadingCard() {
    return (
        <div className="col-sm-4 col-md-3 p-3" style={{ width: '300px' }}>
            <div className="card p-0" aria-hidden="true">
                <img src="../../assets/placeholder-img.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <button className="btn btn-primary disabled placeholder col-6"></button>
                </div>
            </div>
        </div>
    )
}
