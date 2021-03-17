import React from 'react'

const StartPage = () => {
	return (
		<div className="container-fluid">
			<div className="jumbotron jumbotron-fluid">
				<div className="container text-center">
						<h1 className="display-4">bioDAT</h1>
						<p className="lead">La mejor herramienta libre para análisis de datos de bioimpedancia</p>
				</div>
			</div>
			<div className="container">
				<div className="row">
				<div className="col text-center">
						<a className="btn btn-outline-primary btn-lg" href="/register">Comenzar</a>
				</div>
				<div className="col text-center">
						<a className="btn btn-outline-secondary btn-lg" href="/tutoriales">Tutoriales</a>
				</div>
				</div>
			</div>
		</div>
	)
};
export default StartPage;