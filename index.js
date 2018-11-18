#!/usr/bin/env node
const program = require('commander');
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const countries = require('./countries.json');


// Configuration des paramètres attendus
program
    .version('1.0.0')
    .option('--paris', 'returns the current weather in Paris')
    .option('--london', 'returns the current weather in London')
    .option('--madrid', 'returns the current weather in Madrid')
    .option('--rome', 'returns the current weather in Rome')
    .option('-m, --meteo', 'takes a country or country code and city, returns the current weather there')
    .option('-t, --meteotext', 'Does the same as --meteo with the added choice of having the result in a text file')

// On parse (convertit en format utilisable) les options // fonction synchrone
program.parse(process.argv)


// Maintenant on peut les utiliser
if (program.paris) 
{
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=paris,fr&APPID=68c96a0c3f8d1756d1cfc13c801a5da7')
        .then((result) => 
        {
            meteoResult = result.data
            temp = new Intl.NumberFormat('Arab', { style: 'decimal'}).format(meteoResult.main.temp - 273.15)

            console.log(meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description)
        })
        .catch((err) => 
        {
            console.log(err.message)
        });
}
else if (program.london) 
{
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=london,gb&APPID=68c96a0c3f8d1756d1cfc13c801a5da7')
        .then((result) => 
        {
            meteoResult = result.data
            temp = new Intl.NumberFormat('Arab', { style: 'decimal'}).format(meteoResult.main.temp - 273.15)

            console.log(meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description)
        }).catch((err) => 
        {
            console.log(err.message)
        });
}
else if (program.madrid) 
{
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=madrid,es&APPID=68c96a0c3f8d1756d1cfc13c801a5da7')
        .then((result) => 
        {
            meteoResult = result.data
            temp = new Intl.NumberFormat('Arab', { style: 'decimal'}).format(meteoResult.main.temp - 273.15)

            console.log(meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description)
        })
        .catch((err) => 
        {
            console.log(err.message)
        });
}
else if (program.rome) 
{
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=rome,it&APPID=68c96a0c3f8d1756d1cfc13c801a5da7')
        .then((result) => 
        {
            meteoResult = result.data
            temp = new Intl.NumberFormat('Arab', { style: 'decimal'}).format(meteoResult.main.temp - 273.15)

            console.log(meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description)
        })
        .catch((err) => 
        {
            console.log(err.message)
        });
}
else if (program.meteo) 
{
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your country or country code:',
            name: 'country'
        },
        {
            type: 'input',
            message: 'Enter your city:',
            name: 'city'
        }
    ]).then((answers) => 
    {
        country_code = "";

        if (answers.country.length < 2) 
        {
            throw new Error("Not enough character")
        }
        else if (answers.country.length == 2) 
        {
            countries.map((country) => 
            {
                if (country.code == answers.country.toUpperCase()) 
                {
                    country_code = country.code;
                }
            })
            if (country_code == "") 
            {
                throw new Error("Invalid country code")
            }
            return answers.city+','+country_code      
        }
        else 
        {
            countries.map((country) => 
            {
                if (country.name.toLowerCase() == answers.country.toLowerCase()) 
                {
                    country_code = country.code;
                }                
            })
            if (country_code == "") 
            {
                throw new Error("Invalid country name")
            }
            return answers.city+','+country_code
        }
    })
    .then((query) => 
    {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q='+query+'&APPID=68c96a0c3f8d1756d1cfc13c801a5da7')
        .then((result) => 
        {
            meteoResult = result.data
            temp = new Intl.NumberFormat('Arab', { style: 'decimal'}).format(meteoResult.main.temp - 273.15)

            console.log(meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    })
    .catch((err) => 
    {
        console.log(err.message)
    })
}
else if (program.meteotext) 
{
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your country or country code:',
            name: 'country'
        },
        {
            type: 'input',
            message: 'Enter your city:',
            name: 'city'
        },
        {
            type: 'confirm',
            name: 'question',
            message: 'Do you want this on a text file ?'
        }
    ]).then((answers) => 
    {
        var tab         = new Array();
        country_code    = "";

        if (answers.country.length < 2) 
        {
            throw new Error("Not enough character")
        }
        else if (answers.country.length == 2) 
        {
            countries.map((country) => 
            {
                if (country.code == answers.country.toUpperCase()) 
                {
                    country_code = country.code;
                }
            })
            if (country_code == "") 
            {
                throw new Error("Invalid country code")
            }
            query   = answers.city+','+country_code
            tab[0]  = query
            tab[1]  = answers.question
            return tab   
        }
        else 
        {
            countries.map((country) => 
            {
                if (country.name.toLowerCase() == answers.country.toLowerCase()) 
                {
                    country_code = country.code;
                }                
            })
            if (country_code == "") 
            {
                throw new Error("Invalid country name")
            }
            query   = answers.city+','+country_code
            tab[0]  = query
            tab[1]  = answers.question
            return tab
        }
    })
    .then((tab) => 
    {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q='+tab[0]+'&APPID=68c96a0c3f8d1756d1cfc13c801a5da7')
        .then((result) => 
        {
            meteoResult = result.data
            temp = new Intl.NumberFormat('Arab', { style: 'decimal'}).format(meteoResult.main.temp - 273.15)

            if (!tab[1]) 
            {
                console.log(meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description)
            }
            else 
            {
                fs.writeFile('./meteo.txt', meteoResult.name + ': it is '+temp+'ºc with a '+ meteoResult.weather[0].description+'\n',(err) => {
                    if (err) throw err
                    console.log('Result written in meteo.txt')
                })
            }
        }
    )
        .catch((err) => 
        {
            console.log(err.message)
        })
    })
    .catch((err) => 
    {
        console.log(err.message)
    })
}
else 
{
    program.help()
}