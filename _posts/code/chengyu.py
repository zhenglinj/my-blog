# -*- coding: utf-8 -*-

#anthor jiqunpeng
#time 20121124
import urllib
import re

def getHtml(url): #从URL中读取html内容
    page = urllib.urlopen(url)
    html = page.read()
    page.close()
    return html

def getDictionary(html): #匹配成语
    reg = "<a href=\"/cy(\d+)/(\d+).html\">(.*?)</a>"
    dicList = re.compile(reg).findall(html)
    return dicList

def getItemSite():#手工把每个字母开头的页面数统计下来
    itemSite = {}#申明为空字典
    itemSite["A"] = 3
    itemSite["B"] = 21
    itemSite["C"] = 19
    itemSite["D"] = 18
    itemSite["E"] = 2
    itemSite["F"] = 14
    itemSite["G"] = 13
    itemSite["H"] = 15
    itemSite["J"] = 23
    itemSite["K"] = 6
    itemSite["L"] = 15
    itemSite["M"] = 12
    itemSite["N"] = 5
    itemSite["O"] = 1
    itemSite["P"] = 6
    itemSite["Q"] = 16
    itemSite["R"] = 8
    itemSite["S"] = 26
    itemSite["T"] = 12
    itemSite["W"] = 13
    itemSite["X"] = 16
    itemSite["Y"] = 35
    itemSite["Z"] = 21
    return itemSite


if __name__== "__main__":
    dicFile = open("dic.txt","w+")#保存成语的文件
    domainsite = "http://chengyu.t086.com/list/"
    itemSite = getItemSite()
    for key in sorted(itemSite.keys())
        dicFile.write("## "+key+"\n")
        value = itemSite[key]
        for index in range(1, value+1):
            site = key+"_"+str(index)+".html"
            dictionary = getDictionary(getHtml(domainsite+site))
            for dic in dictionary:
                dicFile.write(dic[2]+"\n")#标记为成语，分词时使用
        dicFile.write("\n")
        print key+'字母成语抓取完毕'
    dicFile.close()
    print '全部成语抓取完毕'
