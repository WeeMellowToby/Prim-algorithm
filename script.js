var network = [
    [0, 7, 8, 17, 16, 0],
    [7, 0, 11, 16, 15, 5],
    [8, 11, 0, 0, 9, 3],
    [17, 16, 0, 0, 13, 6],
    [16, 15, 9, 13, 0, 10],
    [0, 5, 3, 6, 10, 0]
];
function Prims(network, start) {
    let selected = [start]
    let newNetwork = []
    newNetwork = Array.from(Array(network.length), () => new Array(network.length).fill(0));

    const ptrToElement = (ptr) => {
        let x = ptr % network.length;
        let y = Math.floor(ptr / network.length)
        return network[y][x]
    }
    //add all edges to tree
    for (let i = 0; i < network.length - 1; i++) {
        //ptr to next lowest edge to add to network
        let lowestPtr = 0;
        //loop through all already selected/added nodes to find the next lowest to add to the network
        for (let j = 0; j < selected.length; j++) {
            //loop through all nodes
            for (let k = 0; k < network.length; k++) {
                //if node already added
                if (selected.includes(k)) {
                    continue;
                }
                //if no connection exists
                if (network[selected[j]][k] == 0) {
                    continue;
                }
                if (network[selected[j]][k] < ptrToElement(lowestPtr) || lowestPtr == 0) {
                    lowestPtr = (selected[j] * network.length) + k;
                }
            }
        }
        newNetwork[Math.floor(lowestPtr / newNetwork.length)][lowestPtr % newNetwork.length] = ptrToElement(lowestPtr);
        newNetwork[lowestPtr % newNetwork.length][Math.floor(lowestPtr / newNetwork.length)] = ptrToElement(lowestPtr);
        selected.push(lowestPtr % network.length);
    }
    console.log(selected)
    return newNetwork;
}
function DisplayNetwork(network) {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    //plotting the points of the network
    const centreX = 200;
    const centreY = 200;
    const radius = 75;
    const increment = (2 * Math.PI) / network.length;
    let positions = []
    for (let i = 0; i < network.length; i++) {
        const angle = i * increment;
        let posX = centreX + (radius * Math.sin(angle))
        let posY = centreY + (radius * Math.cos(angle))
        ctx.beginPath();
        ctx.ellipse(posX, posY, 5, 5, 0, 0, 2 * Math.PI);
        ctx.fill();
        positions.push([posX, posY])
    }
    for (let i = 0; i < network.length; i++) {
        for (let j = 0; j < network.length; j++) {
            if (network[i][j] != 0) {
                ctx.beginPath();
                ctx.moveTo(positions[i][0], positions[i][1]);
                ctx.lineTo(positions[j][0], positions[j][1]);
                ctx.stroke();
            }

        }
    }

}
DisplayNetwork(Prims(network, 3))
