import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';

const Home: NextPage = () => {
  // API key
  useEffect(() => {
    Cohere.init("1MH_");
  }, [])
  return (


     
  );
};

export default Home;
