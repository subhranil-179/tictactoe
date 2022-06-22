class Player {
    constructor(p_name, p_sign) {
        this.name = p_name;
        this.sign = p_sign;
        this.player_move_list = Array();
        this.win = false;
        this.win_chance = 0;
    }
    make_move(target) {
        target.innerText = this.sign;
        this.player_move_list.push((target.id).slice(-2));
        this.player_move_list.sort();
    }

    check_win() {
        for (let i = 0; i < wincases.length; i++) {
            if (this.player_move_list.includes(wincases[i][0]) && this.player_move_list.includes(wincases[i][1]) && this.player_move_list.includes(wincases[i][2])) {
                this.win = true;
                const line_properties = wincases[i][3];
                drawwinline(...line_properties)
                i = wincases.length;
            }
            if (this.win == true) {
                current_move = 9;
                document.getElementById("msg").innerText = `${this.sign} won!`
                document.querySelector('button').innerText = 'Play again!!!'
                const allblocks = Array.from(document.getElementsByClassName('block'));
                allblocks.forEach((e)=>{e.style.cursor = 'not-allowed'});
            }
        }
    }
}

const wincases = [
    ['11', '12', '13', [0, .5, 0, 2]],
    ['21', '22', '23', [0, 1.5, 0, 2]],
    ['31', '32', '33', [0, 2.5, 0, 2]],
    ['11', '21', '31', [-1, 1.5, 90, 2]],
    ['12', '22', '32', [0, 1.5, 90, 2]],
    ['13', '23', '33', [1, 1.5, 90, 2 ]],
    ['11', '22', '33', [0, 1.5, 45, 3]],
    ['31', '22', '13', [0, 1.5, -45, 3]]
]

let allBlocks = document.getElementsByClassName('block');
let current_move = 1;

let Player1 = new Player("Player 1", "O");
let Player2 = new Player("Player 2", "X");

let not_allowed = Array()


for (let index = 0; index < allBlocks.length; index++) {
    let block = allBlocks[index];
    block.addEventListener('click', (block) => {
        current_move <= 9 ? !not_allowed.includes(block.target) ? assign_value(block) : console.log('this is illegal move') : console.log("not allowed sir"); // Checks validity of the move and executes the function
    })
    block.addEventListener('mouseenter', (block)=>{
        not_allowed.includes(block.target) ? block.target.style.cursor = 'not-allowed': block.target.style.cursor = 'pointer';
    })
}


function assign_value(block) {
    target = block.target;

    not_allowed.push(target);

    target.style.color = 'white'
    if (current_move % 2 == 0) {
        Player2.make_move(target)
        Player2.check_win();

    }
    else {
        Player1.make_move(target)
        Player1.check_win();
    }
    current_move++;

}

function resetgame() {
    window.location.reload();
}

function drawwinline(x, y, angle, width) {
    
    if(window.innerHeight <= 1000 && window.innerWidth <= 500){
        unit = 90/3;
        document.querySelector('.line').style = `transform: translate(${x * unit}vw, ${y * unit}vw) rotate(${angle}deg); width: ${width * unit}vw`;
    }
    else{
        unit = 50 / 3;
        document.querySelector('.line').style = `transform: translate(${x * unit}vh, ${y * unit}vh) rotate(${angle}deg); width: ${width * unit}vh`;
    }
}
