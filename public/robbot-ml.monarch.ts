// Monarch syntax highlighting for the robbot-ml language.
export default {
    keywords: [
        'Clock','Forward','bool','cm','else','getDistance','getTimestamp','if','let','loop','mm','number','setSpeed','var','void'
    ],
    operators: [
        '!=','*','+',',','-','/',':','<','<=','=','==','>','>='
    ],
    symbols: /!=|\(|\)|\*|\+|,|-|\/|:|<|<=|=|==|>|>=|\{|\}/,

    tokenizer: {
        initial: [
            { regex: /(\^?(([a-z]|[A-Z])|_)((([a-z]|[A-Z])|_)|[0-9])*)/, action: { cases: { '@keywords': {"token":"keyword"}, '@default': {"token":"string"} }} },
            { regex: /[0-9]+/, action: {"token":"number"} },
            { regex: /(("((\\([\s\S]))|((?!(\\|"))[\s\S]*?))*")|('((\\([\s\S]))|((?!(\\|'))[\s\S]*?))*'))/, action: {"token":"string"} },
            { include: '@whitespace' },
            { regex: /@symbols/, action: { cases: { '@operators': {"token":"operator"}, '@default': {"token":""} }} },
        ],
        whitespace: [
            { regex: /\/\*\*\//, action: {"token":"comment","next":"@comment"} },
            { regex: /(\/\/((?!(\n|\r))[\s\S]*?)(\r?\n)?)/, action: {"token":"comment"} },
            { regex: /((( |	)|\r)|\n)+/, action: {"token":"white"} },
            { regex: /([\s\S])/, action: {"token":"white"} },
        ],
        comment: [
            { regex: /[^/\*\*/]+/, action: {"token":"comment"} },
            { regex: /\*\//, action: {"token":"comment","next":"@pop"} },
            { regex: /[/\*\*/]/, action: {"token":"comment"} },
        ],
    }
};
