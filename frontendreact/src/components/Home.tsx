import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Content from './Content';

interface Props {
    title: string;
		children: React.ReactNode,
}

const Home = (props: Props) => {
	return(
		<div className="wrapper">
				<Header />
				<SideBar />
				<Content title={props.title}> 
						{props.children}
				</Content>
				<Footer />
		</div>
	);
};
export default Home;