import React from 'react';

interface Props {
    title: string;
		children: React.ReactNode;
}

const Content = (props: Props) => {
	return (
		<div className="content-wrapper">
			<section className="content-header">
			<div className="container-fluid">
					<div className="row mb-2">
					<div className="col-sm-6">
							<h1>{props.title}</h1>
					</div>
					<div className="col-sm-6">
							<ol className="breadcrumb float-sm-right">
							<li className="breadcrumb-item">
									<a href="/" onClick={(event) => event.preventDefault()}>
									Home
									</a>
							</li>
							<li className="breadcrumb-item active">Blank Page</li>
							</ol>
					</div>
					</div>
			</div>
			</section>
			<section className="content">{props.children}</section>
		</div>
	);
}
export default Content;