import  { Knex } from "knex";

export type Score = {
    id: number;
    player: string;
    duration: number;
    value: number;
    isBestScore: boolean | null;

}

export const getScores = (connection: Knex, limit: number = 100) => connection.select('*').from('score').orderBy(([{ column: 'value', order: 'asc' }])).limit(limit);

export const getBestScore = async (connection: Knex) => {
    const [bestScore] = await getScores(connection, 1)

    return bestScore;
};

export const addNewScore = async(connection: Knex, score: Score) => {
    const oldBestScore = await getBestScore(connection);
    
    if(oldBestScore?.value > score.value) {
        await connection('score').update({isBestScore: false}).where({id: oldBestScore.id});
        
        return connection.insert({ ...score, isBestScore: true }, ['id', 'isBestScore']).into('score');
    }
    
    return connection.insert({ ...score, isBestScore: !oldBestScore }, ['id', 'isBestScore']).into('score');
};