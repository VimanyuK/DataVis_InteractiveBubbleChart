
  var width = 1400,
  height = 1200;

  var g = d3.select("#chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width)
        // .style("background", "grey")
        .append("g")
        .attr("transform", "translate(0,0)");

changeYear('2015');

function changeYear(year){
  console.log("function");
	var CSV2015 = "tennis2015.csv";
	var CSV2016 = "tennis2016.csv";
	if (year === '2015'){
		var dataSource = CSV2015;
	} else {
		var dataSource = CSV2016;
	}
// Imorting the dataset
  // d3.queue()
  //   .defer(d3.csv,"tennis2015.csv")
  //   .await(ready);
// function to run after imorting the dataset
  // function ready(error,datapoints) {
    // console.log(datapoints)
console.log(dataSource)
g.selectAll("*").remove();
// The tooltip
var tip = d3.tip().attr("class", "d3-tip")
            .html(function(d){
              var text = "<strong>Tournament:</strong> <span style='color:Red'>"+d.Tournament+"</span><br>";
              text += "<strong>Round:</strong> <span style='color:Red'>"+d.Round+"</span><br>";
              text += "<strong>Winner:</strong> <span style='color:Red'>"+d.Winner+"</span><br>";
              text += "<strong>Loser:</strong> <span style='color:Red'>"+d.Loser+"</span><br>";
              text += "<strong>Score:</strong> <span style='color:Red'>"+d.Wsets+" - "+d.Lsets +"</span><br>";
              return text;
            });
g.call(tip);
// Defining Scale
var radiusScale = d3.scaleSqrt().domain([1,27]).range([5,25]);
// colour
var TournamentColor = d3.scaleOrdinal(d3.schemeCategory10);

// legend
var legendRadius = d3.scaleSqrt().domain([10,550]).range([25,150]);
data = [550,450,350,250,175,75,10];

g.selectAll("circle")
.data(data)
.enter().append("circle")
.attr("r",function(d){
   return legendRadius(d);
     })
.attr("cx",1250)
.attr("cy",150)
.attr("stroke", "green")
.attr("stroke-width", 2)
.attr("fill", "none");

g.append("text")
.attr("x", 1250)
.attr("y", 15)
.attr("text-anchor", "middle")
.style("font-size", "22px")
.style("fill", "white")
.text("1st Round");

g.append("text")
.attr("x", 1250)
.attr("y", 35)
.attr("text-anchor", "middle")
.style("font-size", "20px")
.style("fill", "white")
.text("2nd Round");

g.append("text")
.attr("x", 1250)
.attr("y", 55)
.attr("text-anchor", "middle")
.style("font-size", "18px")
.style("fill", "white")
.text("3rd Round");

g.append("text")
.attr("x", 1250)
.attr("y", 75)
.attr("text-anchor", "middle")
.style("font-size", "16px")
.style("fill", "white")
.text("4th Round");

g.append("text")
.attr("x", 1250)
.attr("y", 100)
.attr("text-anchor", "middle")
.style("font-size", "16px")
.style("fill", "white")
.style("font-weight", "bold")
.text("Quarterfinals");

g.append("text")
.attr("x", 1250)
.attr("y", 120)
.attr("text-anchor", "middle")
.style("font-size", "14px")
.style("fill", "white")
.style("font-weight", "bold")
.text("Semi Finals");

g.append("text")
.attr("x", 1250)
.attr("y", 140)
.attr("text-anchor", "middle")
.style("font-size", "12px")
.style("fill", "white")
.style("font-weight", "bold")
.text("The Finals");

g.append("text")
.attr("x",20)
.attr("y",20)
.attr("text-anchor", "start")
.style("font-size", "15px")
.style("fill", "white")
.text("*Size of the circle shows the relative matches won by the winner in all the grand slams in 2015.");

g.append("text")
.attr("x",20)
.attr("y",40)
.attr("text-anchor", "start")
.style("font-size", "15px")
.style("fill", "white")
.text("*Hover over the circles for more details.");

var Tournaments = ["Australian Open", "US Open", "French Open", "Wimbledon"];

var legend = g.append("g")
    .attr("transform", "translate(" + (width -1375) +
        "," + (height - 1125) + ")");

Tournaments.forEach(function(Tournament, i){
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 35) + ")");

        legendRow.append("rect")
            .attr("width", 30)
            .attr("height", 30)
            .attr("stroke", "white")
            .attr("fill", TournamentColor(Tournament));

        legendRow.append("text")
            .attr("x", 40)
            .attr("y", 22)
            .attr("text-anchor", "start")
            .style("font-size", "20px")
            .style("text-transform", "capitalize")
            .style("fill", "Red")
            .style("font-weight", "bold")
            .text(Tournament);
        });

// Defining all the forces
var forceZ = d3.forceRadial(function(d){
    if (d.Round === "1st Round"){
        return 550;
      }else if (d.Round === "2nd Round") {
        return 450;
      }else if (d.Round === "3rd Round") {
        return 350;
      }else if (d.Round === "4th Round"){
        return 250;
      }else if (d.Round === "Quarterfinals"){
        return 175;
      }else if (d.Round === "Semifinals") {
        return 100;
      }else {
        return 10;
      }
  }).x(width/2).y(height/2)
    .strength(2);
// var center_data = [550,450,350,250,175,100];
  var forceXSep = d3.forceX(function(d){
    if (d.Tournament === "Australian Open"){
      return 350;
    }else if (d.Tournament === "Wimbledon") {
      return 900;
    }else if (d.Tournament === "US Open") {
      return 900;
    }else {
      return 350;
    }
  }).strength(0.05)

  var forceYSep = d3.forceY(function(d){
    if (d.Tournament === "Australian Open"){
      return 300;
    }else if (d.Tournament === "Wimbledon") {
      return 300;
    }else if (d.Tournament === "US Open") {
      return 900;
    }else {
      return 900;
    }
  }).strength(0.05)

  var forceXCom = d3.forceX(width/2).strength(0.05)
  var forceYCom = d3.forceY(height/2).strength(0.05)

// Defining the simulations
  var simulation = d3.forceSimulation()
      .force("z", null)
      .force("x", forceXCom)
      .force("y", forceYCom)
      .force("collide", d3.forceCollide(function(d){
        return radiusScale(d.counts)+2;
      })
      .strength(1));

    d3.csv(dataSource, function(error, datapoints) {
      console.log(dataSource)
        var circles = g.selectAll(".Tournament")
                     .data(datapoints)
                     .enter().append("circle")
                     .attr("class", "Tournament")
                     .attr("r",function(d){
                        return radiusScale(d.counts)
                          })
                    .attr("fill", function(d){
                      return TournamentColor(d.Tournament);
                    })
                    .style("opacity", 0.85)
                    .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    .on("mouseover", tip.show)
                    .on("mouseout", tip.hide);


// to show all the Tournaments
    d3.select("#AllTournament").on("click", function(){
      simulation
      .force("x", forceXCom)
      .force("y", forceYCom)
      .force("collide", d3.forceCollide(function(d){
        return radiusScale(d.counts)+1;
      }).strength(1.2))
      .alpha(0.5)
      .alphaTarget(0.005)
      .restart()
    })
// to split into different Tournaments
    d3.select("#Tournament").on("click", function(){
      simulation
      .force("x", forceXSep)
      .force("y", forceYSep)
      .force("collide", d3.forceCollide(function(d){
        return radiusScale(d.counts)+1;
      }).strength(1.2))
      .alpha(0.5)
      .alphaTarget(0.05)
      .restart()

      d3.selectAll("tempCircle").exit().remove();
    })
// to show all the Rounds
    d3.select("#Round").on("click", function(){
       simulation
      .force("x", forceZ)
      .force("collide", d3.forceCollide(function(d){
        return radiusScale(d.counts)+1;
      }).strength(1.2))
      .alpha(0.05)
      .alphaTarget(0.001)
      .restart()

    });


   simulation.nodes(datapoints)
              .on("tick", ticked)

    function ticked(){
    circles.attr("cx", function(d){
            return d.x
          })
           .attr("cy", function(d){
            return d.y
          })
          }
    })}
