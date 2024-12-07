import React, { useEffect, useRef } from "react";
import potatoImg from "@/app/assets/icons/potato.png";
import pizzaImg from "@/app/assets/icons/pizza.png";
import sausageImg from "@/app/assets/icons/sausage.png";
import Matter, { Engine, Render, Bodies, World, Runner } from 'matter-js'


const FoodThrowMatterJS = () => {
    const sceneRef = useRef(null);
    const canvasRef = useRef(null);
    const imageObjects = [potatoImg, pizzaImg, sausageImg];
    const width = window.innerWidth
    const height = window.innerHeight
    const countFood = 18

    useEffect(() => {

        // initialize environment for matter.js
        const engine = Engine.create({});
        const render = Render.create({
            element: sceneRef.current!,
            engine: engine,
            canvas: canvasRef.current!,
            options: {
                width: width,
                height: height,
                background: 'transparent',
                wireframes: false,
            },
        });


        // create wall for hit object and add to World
        const leftWall = Bodies.rectangle(0, 0, 40, height * 2, {
            isStatic: true,
            render: {
                fillStyle: "transparent"
            }
        });
        World.add(engine.world, [
            leftWall
        ])

        // create food object with rectangle and add to world and set velocity
        const createFoodObject = (x: number, y: number, randomSize: number, imgSrc: string) => {
            const food = Matter.Bodies.rectangle(x, y, 50, 50, {
                restitution: 0.8,
                render: {
                    sprite: {
                        texture: imgSrc,
                        xScale: width < 768 ? randomSize * 0.25 + 1 : randomSize * 1 + 1,
                        yScale: width < 768 ? randomSize * 0.25 + 1 : randomSize * 1 + 1,
                    },
                },
            });

            World.add(engine.world, food);

            Matter.Body.setVelocity(food, {
                x: width < 768 ? -Math.random() * 20 - 10 : -Math.random() * 30 - 25,
                y: width < 768 ? -2 : -6,
            });
        };


        // generate obejcts and create random x and y and select image for food
        const generateObjects = () => {
            for (let i = 0; i < countFood; i++) {
                const randomNumber = Math.random()
                const x = width + 300;
                const y = (height / 3) - randomNumber * 30 - 30;
                const imgSrc = imageObjects[Math.floor(randomNumber * imageObjects.length)];
                createFoodObject(x, y, randomNumber, imgSrc.src);
            }
        };

        generateObjects();

        // run engine
        Runner.run(engine)
        Render.run(render);

        return () => {

            // cleanup
            Render.stop(render);
            World.clear(engine.world, true);
            Engine.clear(engine);
        };
    }, []);

    return (
        <div className="w-full h-full fixed z-[9]" ref={sceneRef}>
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FoodThrowMatterJS;
