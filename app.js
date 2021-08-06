import {Client, UnitSystem} from '@googlemaps/google-maps-services-js';
import axios from "axios";


const key = 'AIzaSyDUzO2--Il8lHq8WlplPrOlFKDO-_zrnbg';

async function work(addresses) { 

    const ax = axios.create();
    var client = new Client({ax});
    try {
        const coors = await Promise.all(
            addresses.map((add) => {
                return client.geocode({
                    params: {
                        key: key,
                        address:add
                    }
                })
            })
        );
        let locs = coors.map((x) => {return x.data.results[0].geometry.location;});
        const home = {lat: 41.15723879999999, lng: -73.3463459 };
        locs.unshift(home);
        console.log("Done");

        const dist = await client.distancematrix({
            params: {
                key: key,
                origins: locs,
                destinations: locs,
                mode: 'DRIVING',
                // transitOptions: TransitOptions,
                // drivingOptions: DrivingOptions,
                units: UnitSystem.imperial,
                avoidHighways: false,
                avoidTolls: false,
            },
            timeout: 1000
        });
        addresses.unshift(homeAddr);
        var j;
        var total = 0;
        for(let i = 0; i < dist.data.rows.length; i++) {
            j = (i+1) % dist.data.rows.length;
            total += dist.data.rows[i].elements[j].distance.value / 1609;
            console.log(parseFloat(dist.data.rows[i].elements[j].distance.value / 1609).toFixed(1)
            , '===>', addresses[i]);
        }
        console.log('Total', parseFloat(total).toFixed(1));
    } catch(err) {
        console.log(err);
    }
};

var homeAddr = "1 Diamond Hill Lane, Westport, CT 06880";
var nelson = '80 Bayberry Lane, Westport, CT 06880';
var workAddr = "615 Riverside Ave, Westport, CT 06880";
var adds = [
    '8 Glasser St, Norwalk,, CT 06854'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
    ,'2 Honeysuckle Dr, Norwalk, CT 06851'
    ,'317 Cove Rd, Stamford, CT 06902'
];
var addresses = [nelson, workAddr];
var results = work(adds);
 