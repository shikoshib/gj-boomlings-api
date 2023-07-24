module.exports = {
    demonlist:
        async function (name) {
            let r = await fetch(`https://pointercrate.com/api/v2/demons/?name=${name}`);
            let lvlObj = await r.json();
            if (!lvlObj.length) return null;

            const res = {
                "position": lvlObj[0].position,
                "publisher": lvlObj[0].publisher.name,
                "verifier": lvlObj[0].verifier.name,
            }

            return res;
        }
}