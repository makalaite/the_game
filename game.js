/**
 * Created by agnė on 8/1/17.
 */

var FastTyping = function () {
    /** describing states
     * @type {string}
     */
    const STATE_REGISTER = 'register';
    const STATE_LEVEL_SELECTION = 'choose_level';
    const STATE_GAME = 'game';
    const STATE_GAME_OVER = 'game_over';

    var name,                                               //for later use in RegisterLogics
        lastState,                                           //for later use in switch
        level;


    /**
     * every view has logic for every state. one has to be default (register).
     * It will show register form and clean input after game is over unless you're using it again. and disabled go button.
     * one state will be SHOW other - HIDE;
     * @constructor
     */

    //---------------------------------------------------- Register ---------------------------------------------------------

    var RegisterLogics = function () {
        var view = $('#register');                      //jquery object created, now we can use jquery functions
        var input = $('#name');
        var button = $('#go');

        this.show = function () {                       //it's possible tu use it like public because of THIS
            view.removeClass('hidden');                 //removes hidden class (from bootstrap) that you could see the view
            enable();
        };

        this.hide = function () {                       //removed before, now we need to add the same class
            view.addClass('hidden');
            disable();
        };

        /**
         * will be checking the value.length of input and will activate the button after
         */
        function enable()                               //will be used with show cuz it enables the button after
        {
            input.keyup(function () {
                if (input.val().length >= 3) {
                    button.attr('disabled', false);
                } else {
                    button.attr('disabled', true);
                }
            });

            button.click(function () {
                name = input.val();
                changeState(STATE_LEVEL_SELECTION)
            });
        }

        function disable() {
            input.unbind();
            button.unbind();
            input.val('');
        }
    };

    var register = new RegisterLogics();                //initializing object. now u can call it with this variable. it's prepared for using in switch.
                                                        //possible to create object only after describing function name.

    //---------------------------------------------------------- Select Level ----------------------------------------------------------------

    var LevelSelectionLogics = function ()
    {
        var view = $('#level');                                                         //jquery object created, now we can use jquery functions
        var button = $('#next');


        this.show = function () {                                                        //it's possible tu use it like public because of THIS
            view.removeClass('hidden').prepend('Player name: ' + name);                 //removes hidden class (from bootstrap) that you could see the view
            enable();

        };

        this.hide = function () {                                                   //removed before, now we need to add the same class
            view.addClass('hidden');
            disable();
        };

        /**
         * will be checking the value.length of input and will activate the button after
         */
        function enable()
        {
            button.click(function () {
                level = $('input[name = optionsRadios]:checked').val();
                changeState(STATE_GAME)
            });
        }

        function disable() {
            button.unbind();
        }
    };



    var levelSelection = new LevelSelectionLogics();

    //---------------------------------------------------------------- THE GAME ----------------------------------------------------------

    var GameLogics = function ()
    {
        var view = $('#game');
        var letters = ['ABCDEFGHIJKLMNPRSTUVWXYZ'];
        var timeOut;
        var letterPlacement = $('#letter');
        var letterKey;

        function changeLetter() {
            letterKey = Math.round(Math.random() * (letters.length - 1));
            letterPlacement.html(letters[letterKey]);
        }

        timeOut = setTimeout(changeLetter, level * 100);

        this.show = function () {                       //it's possible tu use it like public because of THIS
            view.removeClass('hidden');                 //removes hidden class (from bootstrap) that you could see the view
            enable();
        };

        this.hide = function () {                       //removed before, now we need to add the same class
            view.addClass('hidden');
            disable();
        };

        function enable()
        {
            button.click(function () {
                level = $('input[name = optionsRadios]:checked').val();
                changeState(STATE_GAME)
            });
        }

        function disable() {
            button.unbind();
        }
    };

    //-----------------------------------------------------------------Changing a state ----------------------------------------------------------------------

    /**
     * For states use
     */
    function changeState(value) {
        /**
         * if there is a state, have to change it. in every state they will be hidden.
         */

        if (lastState) {
            lastState.hide();
        }

        switch (value) {
            case STATE_REGISTER:
                lastState = register;                        //register was created before as object and we're calling it with lastState for using show() later.

                break;

            case STATE_LEVEL_SELECTION:

                lastState = levelSelection;                    //new state requires new last state value, otherwise it will show te same (register)

                break;

            case STATE_GAME:
                break;

            case STATE_GAME_OVER:
                break;
        }

        lastState.show();
        // console.log('changing', lastState);
    }


    /**
     * initializing first state
     */
    changeState(STATE_REGISTER);
};
