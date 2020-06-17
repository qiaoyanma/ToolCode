function autoRunGenerator(generatorFun) {
    return function () {
        let gen = generatorFun.apply(this, arguments);
        return new Promise((resolve, reject) => {
            function step(type, args) {
                let genresult;
                try {
                    genresult = gen[type](args);

                } catch (e) {
                    return reject(e);
                }
                let {
                    done,
                    value
                } = genresult;
                if (done) {
                    return resolve(value);
                } else {
                    return Promise.resolve(value).then((value) => {
                        step("next", value);
                    }, (value) => {
                        step("throw", value);
                    })
                }
            }
            step("next");
        });
    }
    

}