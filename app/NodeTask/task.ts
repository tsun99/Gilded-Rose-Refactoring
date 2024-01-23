async function main() {
    const updates = parseInt(process.argv[2]);
    const requestsToApi = parseInt(process.argv[3]);

    console.log(updates, requestsToApi);
}
main();