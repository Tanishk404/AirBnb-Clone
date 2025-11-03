// Search Destination in Input
export const DestinationRoute = (req, res) => {
    const {destination} = req.body;
    console.log(destination);
    res.json({ msg: `Tumne ye bheja: ${destination}` });
}




export const HostedHome = (req, res) => {
    res.render("Host.ejs");
}
