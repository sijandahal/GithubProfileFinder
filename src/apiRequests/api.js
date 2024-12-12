async function FetchUserData(username) {
    const base_url = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(base_url);
        if (!response.ok) {
            throw console.error("Failed to fetch Data");
        }
        const jsonData = await response.json();
        return jsonData;
    }
    catch (error) {
        console.log(error);
        return null
    }
}

async function FetchUserRepos(username) {
    const per_page = 100;
    const base_url = `https://api.github.com/users/${username}/repos`;
    console.log(base_url);
    try {
        const response = await fetch(`${(base_url)}?per_page=${per_page}`);
        if (!response.ok) {
            throw console.error("Error")
        }
        const jsonDataRepos = await response.json();
        console.log(jsonDataRepos);
        return jsonDataRepos;
    }

    catch(error) {
        console.log(error);
        return null;
    }


}

FetchUserData();
export {
    FetchUserData, FetchUserRepos
};