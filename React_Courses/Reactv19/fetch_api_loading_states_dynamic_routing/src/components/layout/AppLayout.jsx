import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate, useNavigation } from 'react-router-dom'
import Loader from './Loader'

const AppLayout = () => {

  // Implementing Global Loading state and Loaders
  const navigation = useNavigation();
  console.log(navigation);

  if (navigation.state === "loading") return <Loader />;

  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default AppLayout
