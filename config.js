(function () {
  var T = ["How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?","How often do you have difficulty getting things in order when you have to do a task that requires organization?","How often do you have problems remembering appointments or obligations?","When you have a task that requires a lot of thought, how often do you avoid or delay getting started?","How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?","How often do you feel overly active and compelled to do things, like you were driven by a motor?","How often do you make careless mistakes when you have to work on a boring or difficult project?","How often do you have difficulty keeping your attention when you are doing boring or repetitive work?","How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?","How often do you misplace or have difficulty finding things at home or at work?","How often are you distracted by activity or noise around you?","How often do you leave your seat in meetings or other situations in which you are expected to remain seated?","How often do you feel restless or fidgety?","How often do you have difficulty unwinding and relaxing when you have time to yourself?","How often do you find yourself talking too much when you are in social situations?","When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?","How often do you have difficulty waiting your turn in situations when turn taking is required?","How often do you interrupt others when they are busy?"];
  // shaded threshold per item from the source form: 2 = Sometimes or more, 3 = Often or more
  var SH = [2,2,2,3,3,3,3,3,2,3,3,2,3,3,3,2,3,2];
  var O = ["Never","Rarely","Sometimes","Often","Very Often"].map(function (l, i) { return { v: i, l: l, show: false }; });
  window.CFG = {
    slug: "asrs", short: "ASRS", sub: "Adult ADHD Self-Report Scale (ASRS-v1.1) Symptom Checklist",
    intro: "Please answer the questions below, rating yourself on each of the criteria shown. As you answer each question, choose the answer that best describes how you have felt and conducted yourself over the past 6 months. Please give this completed checklist to your healthcare professional to discuss during today’s appointment.",
    sections: [
      { id: "a", title: "Part A", items: T.slice(0, 6).map(function (t, i) { return { id: "q" + (i + 1), num: (i + 1) + ".", text: t, opts: O }; }) },
      { id: "b", title: "Part B", items: T.slice(6).map(function (t, i) { return { id: "q" + (i + 7), num: (i + 7) + ".", text: t, opts: O }; }) }
    ],
    scoringHint: '<p class="hint">Shaded boxes on the source form: items 1, 2, 3, 9, 12, 16, 18 shaded at Sometimes, Often, Very Often; all other items shaded at Often and Very Often. Shaded counts are reported for Part A (items 1-6) and Part B (items 7-18). The source page prints no cut-off; the clinician interprets the shaded counts.</p>',
    footer: "ASRS-v1.1 Symptom Checklist · screening only, not diagnostic",
    score: function (A, H) {
      function sh(a, b) { var n = 0; for (var i = a; i <= b; i++) { var v = A["q" + i]; if (v !== null && v >= SH[i - 1]) n++; } return n; }
      var ma = H.missing(A, H.ids("q", 1, 6)).length, mb = H.missing(A, H.ids("q", 7, 18)).length;
      return { incomplete: ma + mb > 0, rows: [["Part A shaded boxes (of 6)", ma ? "Incomplete, not scored (" + sh(1, 6) + " shaded, " + ma + " blank)" : sh(1, 6)], ["Part B shaded boxes (of 12)", mb ? "Incomplete, not scored (" + sh(7, 18) + " shaded, " + mb + " blank)" : sh(7, 18)]] };
    }
  };
})();
