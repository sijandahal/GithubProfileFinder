import React from 'react'
import { FetchUserRepos } from "../apiRequests/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Pie } from "react-chartjs-2";
import PieChart from './Chart.js/Pie';
import BarChart from './Chart.js/BarChart';
import randomColor from 'randomcolor';


function Repos() {
  const [userRepos, setUserRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10
  const { username } = useParams();

  useEffect(() => {
    const fetchRepos = async () => {
      const data = await FetchUserRepos(username);
      setUserRepos(data);
    }
    fetchRepos();
  }, [username])


  //pagination
  const indexofLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexofLastItem - itemsPerPage;
  const currentRepos = userRepos.slice(indexOfFirstItem, indexofLastItem);

  //change page numbers
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  const totalPages = Math.ceil(userRepos.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  //ReposLanguageData
  const countLanguageFrequencies = () => {
    const languageCounts = {};
    userRepos.map((repo) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    })
    return languageCounts;
  };

  const languageFrequencies = countLanguageFrequencies();
  console.log(languageFrequencies);

  //mostStarredRepos
  const mostStarredRepos = ()=> {
    const starredRepos = {}
    userRepos.map((repo)=> {
      if (repo.watchers_count) {
        starredRepos[repo.name]  = repo.watchers_count
      }
    })
    return starredRepos;
  }
  const staredRepos = mostStarredRepos();
  console.log(staredRepos)

  return (
    <section className='container m-auto my-7 -mt-32'>

<div className="chart__wrapper grid grid-cols-3 gap-8">
        <div className="wrap bg-white shadow-sm rounded-md p-6"  style={{ width: '400px', height: '400px' }}>
          <PieChart langauage={languageFrequencies} />
        </div>
        <div className="wrap bg-white shadow-sm rounded-md p-6" style={{ width: '600px', height: '400px' }}>
          <BarChart repos={staredRepos} />
        </div>
      </div>
      <h1 className='text-3xl border-dashed border-b-2 inline-block font-bold mb-3'>Repos</h1>
      <section className='repos grid grid-cols-3 gap-4 '>
        {
          currentRepos.map((repo, index) => {
            return (
              <>
                <li key={index} className='p-4 list-none shadow-md'>{repo.name}</li>
              </>
            )
          })
        }
      </section>

      <div className="wrapper  mt-10 flex-1 flex items-center justify-between border rounded-md border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium"> {`${indexOfFirstItem + 1}`} </span>
              to
              <span class="font-medium"> {`${indexofLastItem}`} </span>
              of
              <span class="font-medium"> {userRepos.length} </span>
              results
            </p>
          </div>
        </div>
        <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
          {
            pageNumbers.map((num) => {
              return (
                <>
                  <span key={num}
                    className={`relative z-10 inline-flex ring-1 ring-inset ring-gray-300 items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${currentPage === num ? "bg-indigo-600 text-white focus-visible:outline-indigo-600 ring-indigo-600"
                      : "bg-white text-black"} `
                    }

                    onClick={() =>
                      paginate(num)}
                  > {num} </span>
                </>
              )
            })
          }
        </nav>
      </div>


    </section>

  )
}

export default Repos;