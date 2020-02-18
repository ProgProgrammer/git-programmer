(function () 
{
    let mainBlock;
    let mobileBlock;
    let staticBlocks;
    let timing;
    let arrows;
    let trafficSlider;
    let autoDirection;
    let obj = {};
    obj.widthTransform = 0;
    
    window.addEventListener('DOMContentLoaded', ()=>
    {
        mainBlock = document.querySelector(".window");
        timing = mainBlock.dataset.timing;
        autoTiming = mainBlock.dataset.autoTiming;
        autoDirection = mainBlock.dataset.autoDirection;
        mobileBlock = document.querySelector(".window-block");
        staticBlocks = document.querySelectorAll(".window-blocks");
        obj.staticBlocksLength = staticBlocks.length;
        arrows = document.querySelectorAll(".arrow");
        
        if (timing !== "")
        {
            mobileBlock.style.transitionDuration = timing + "ms";
        }
        else
        {
            mobileBlock.style.transitionDuration = 500 + "ms";
        }
        createSlider(mainBlock, timing, mobileBlock, arrows);
        
        window.addEventListener('resize', ()=> 
        {
            createSlider(mainBlock, timing, mobileBlock, arrows);
        });
        
        for (let i = 0; i < arrows.length; i++)
        {
            arrows[i].addEventListener('click', ()=> {
                staticBlocks = document.querySelectorAll(".window-blocks");
                mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock);
            });            
        }
        
        if (autoDirection === "right")
        {
            if (autoTiming === "")
            {
                const direction = 1;
                setInterval(autoSlider, 5000, a, mobileBlock, timing, mainBlock);
            }
            else
            {
                const direction = 1;
                setInterval(autoSlider, autoTiming, a, mobileBlock, timing, mainBlock);
            }
        }
        else if (autoDirection === "left")
        {
            if (autoTiming === "")
            {
                const direction = 0;
                setInterval(autoSlider, 5000, a, mobileBlock, timing, mainBlock);
            }
            else
            {
                const direction = 0;
                setInterval(autoSlider, autoTiming, a, mobileBlock, timing, mainBlock);
            }
        }
    });
    
    function autoSlider(i, mobileBlock, timing, mainBlock)
    {
        staticBlocks = document.querySelectorAll(".window-blocks");
        mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock);
    }
    
    function createSlider(mainBlock, timing, mobileBlock, arrows) 
    {
        let widthBlock;
        staticBlocks = document.querySelectorAll(".window-blocks");
        const widthMainblock = mainBlock.offsetWidth;
        const heightMainblock = mainBlock.offsetHeight;
        
        for (let i = 0; i < staticBlocks.length; i++)
        {
            staticBlocks[i].style.width = widthMainblock + "px";
            staticBlocks[i].style.height = heightMainblock + "px";
        }
        
        for (let a = 0; a < staticBlocks.length; a++)
        {
            widthBlock = staticBlocks[a].offsetWidth;
        }
        
        for (let b = 0; b < arrows.length; b++)
        {
            arrows[b].style.top = (heightMainblock / 2) - (arrows[b].offsetHeight / 2) + "px";
        }
    }
    
    function mobileSlider(i, mobileBlock, staticBlocks, timing, mainBlock) 
    {
        let htmlTags;
        trafficSlider = mainBlock.dataset.trafficSlider;
        
        if (trafficSlider === "true")
        {
            mainBlock.dataset.trafficSlider = false;
        }
        else
        {
            return;
        }
        
        if (i === 0)
        {
            htmlTags = staticBlocks[staticBlocks.length-1].outerHTML;
            mobileBlock.insertAdjacentHTML("afterbegin", htmlTags);    
            setTimeout(deleteTag, timing, staticBlocks, i, mobileBlock, mainBlock);
            
            if (/-/.test(mobileBlock.style.transform) === true)
            {
                obj.widthTransform -= staticBlocks[0].offsetWidth;
                mobileBlock.style.left = obj.widthTransform + "px";
                mobileBlock.style.transform = "translate3d(-" + obj.widthTransform + "px, 0px, 0px)";
            }
            else
            {
                obj.widthTransform += staticBlocks[0].offsetWidth;
                mobileBlock.style.left = "-" + obj.widthTransform + "px";
                //console.log(obj.widthTransform);
                mobileBlock.style.transform = "translate3d(" + obj.widthTransform + "px, 0px, 0px)";
            }
            
        }
        else
        {
            htmlTags = staticBlocks[0].outerHTML;
            mobileBlock.insertAdjacentHTML("beforeend", htmlTags);
            setTimeout(deleteTag, timing, staticBlocks, i, mobileBlock, mainBlock);
            if (obj.widthTransform > 0 && (/-/.test(mobileBlock.style.transform) === false))
            {
                console.log(obj.widthTransform);
                obj.widthTransform -= staticBlocks[0].offsetWidth;
                console.log(obj.widthTransform);
                mobileBlock.style.left = "-" + (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
                mobileBlock.style.transform = "translate3d(" + obj.widthTransform + "px, 0px, 0px)";
            }
            else
            {
                console.log(mobileBlock.style.transform);
                console.log(obj.widthTransform);
                obj.widthTransform += staticBlocks[0].offsetWidth;
                console.log(obj.widthTransform);
                mobileBlock.style.left = (obj.widthTransform - staticBlocks[0].offsetWidth) + "px";
                mobileBlock.style.transform = "translate3d(-" + obj.widthTransform + "px, 0px, 0px)";
            }
        }
    }
    
    function deleteTag(staticBlocks, i, mobileBlock, mainBlock) 
    {
        staticBlocks = document.querySelectorAll(".window-blocks");
        mainBlock.dataset.trafficSlider = true;
        if (staticBlocks.length > 1 && i === 0)
        {
            staticBlocks[staticBlocks.length-1].remove();
            //console.log(staticBlocks);
        }
        else if (obj.staticBlocksLength === 1 && i === 1 && staticBlocks[2] !== undefined && staticBlocks[2] !== null)
        {
            staticBlocks[2].remove();
            console.log(i);
        }
        else if (obj.staticBlocksLength > 1)
        {
            staticBlocks[0].remove();
            console.log(i);
            console.log(mobileBlock.style.left);
            console.log(/-/.test(mobileBlock.style.left));
            
            if (/-/.test(mobileBlock.style.left) === true)
            {
                mobileBlock.style.left = "-" + (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
                console.log(mobileBlock.style.left);
            }
            else
            {
                mobileBlock.style.left = (obj.widthTransform + staticBlocks[0].offsetWidth) + "px";
                console.log(mobileBlock.style.left);
            }
        }
        else
        {
            return;
        }
    }
})

()
