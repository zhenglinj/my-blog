# coding: utf-8
username = "zhenglinj" # GitHub 用户名
token = "c7e2ee0e5c5be217ffe5d77833d06ea0f8483c50"  # GitHub Token
repo_name = "zhenglinj.github.io" # 存放 issues
sitemap_url = "https://zhenglinj.github.io/sitemap.xml" # sitemap
kind = "Gitalk" # "Gitalk" or "gitment"

require 'open-uri'
require 'faraday'
require 'active_support'
require 'active_support/core_ext'
require 'sitemap-parser'

sitemap = SitemapParser.new sitemap_url
urls = sitemap.to_a

conn = Faraday.new(:url => "https://api.github.com/repos/#{username}/#{repo_name}/issues") do |conn|
  conn.basic_auth(username, token)
  conn.adapter  Faraday.default_adapter
  puts conn
end

urls.each_with_index do |url, index|
  title = open(url).read.scan(/<title>(.*?)<\/title>/).first.first.force_encoding('UTF-8')
  short_url = url.split(/\//).slice(3,5).join('/')[0,49]
  puts ({ body: short_url, labels: [kind, short_url], title: title }.to_json)
  response = conn.post do |req|
    req.body = { body: short_url, labels: [kind, short_url], title: title }.to_json
  end
  puts response.body
  sleep 15 if index % 20 == 0
end
