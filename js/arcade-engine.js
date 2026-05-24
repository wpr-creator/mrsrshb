/* Mrs. Rogers Arcade helpers. Local-only, no dependencies. */
window.MrsArcade = {
  shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
    return a;
  },
  uniqueChoices(correct, distractors, count=4){
    const out=[];
    const add=v=>{const s=String(v); if(!out.some(x=>String(x)===s)) out.push(v)};
    add(correct);
    distractors.forEach(add);
    return this.shuffle(out).slice(0,count);
  },
  save(key,value){localStorage.setItem(key,JSON.stringify(value))},
  load(key,fallback){try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}}
};
