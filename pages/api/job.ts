import { NowApiHandler } from "@vercel/node";




const job: NowApiHandler = async (req, res) => {

    const token = req.query.token ?? "8e4e4e0eccec7297af9f79be1709387eea7a9296"

    console.log(token)

    const repos = await fetch(`https://api.github.com/user/repos?access_token=${token}`)
        .then(x => x.ok && x.json())

        //console.log(repos)

    const repo = await fetch(`https://api.github.com/repos/${repos[4].fullname}?access_token=${token}`)
         .then(x => x.ok && x.json())

   //const repoContent = await fetch(`https://api.github.com/repos/${repos[4].fullname}/contents/?access_token=${token}`).then(x => x.ok && x.json())

    console.log(repos[4].full_name)
    res.send(repos[4])
}

export default job