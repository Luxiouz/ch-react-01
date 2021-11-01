import React from 'react'

export default function ChekoutForm({customer, loading, handleSubmit}) {
    return (
        <form>
                <div className="mb-3 d-flex align-items-center row">
                    <div className="mb-3 col-sm-6">
                        <label htmlFor="exampleInputName" className="form-label me-2"><small>Nombre</small></label>
                        <input type="text" className="form-control" id="exampleInputName" required/>
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label htmlFor="exampleInputLastName" className="form-label me-2"><small>Apellido</small></label>
                        <input type="text" className="form-control" id="exampleInputLastName" required/>
                    </div>
                </div>
                <div className="mb-3 d-flex align-items-center row">
                    <div className="mb-3 col-sm-6">
                        <label htmlFor="exampleInputEmail1" className="form-label me-2"><small>Correo</small></label>
                        <input type="email" className="form-control me-2" id="exampleInputEmail1" required/>
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label htmlFor="exampleInputPhone" className="form-label me-2"><small>Celular</small></label>
                        <input type="tel" className="form-control me-2" id="exampleInputPhone" required/>
                    </div>
                </div>

                <div className="mb-3 d-flex align-items-center row">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="exampleInputAddress" className="form-label me-2"><small>Dirección</small></label>
                        <input type="text" className="form-control" id="exampleInputAddress" required/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="exampleInputReference" className="form-label col-3 me-2"><small>Referencia</small></label>
                        <input type="text" className="form-control" id="exampleInputReference" />
                    </div>
                </div>


                <div className="mb-3">
                    <input type="checkbox" className="form-check-input me-2" id="termsCheck" required/>
                    <label className="form-check-label" htmlFor="termsCheck">Acepto todos los <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">términos y condiciones</a></label>
                </div>
                <button disabled={loading} type="submit" onClick={handleSubmit} className="btn btn-primary button-large">{loading?'Procesando...':'Comprar'}</button>
            </form>
    )
}
