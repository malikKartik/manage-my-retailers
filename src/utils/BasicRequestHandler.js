class BasicRequestHandler{
    #router;
    constructor(router){
        this.#router = router
    }
    get(route,cb, opts){
        const middlewares = opts?.middlewares || []
        this.#router.get(route, ...middlewares, async (req, res)=>{
            try{
                const data = await cb(req);
                res.send(data);
            } catch(error) {
                console.log(error)
                res.status(500).send('Something went wrong');
            }
        })
    }
    post(route, cb, opts){
        const middlewares = opts?.middlewares || []
        this.#router.post(route, ...middlewares, async (req, res)=>{
            try{
                const data = await cb(req);
                res.send(data);
            } catch(error) {
                console.log(error)
                res.status(500).send('Something went wrong');
            }
        })
    }
}

module.exports = BasicRequestHandler