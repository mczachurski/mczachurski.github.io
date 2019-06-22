import SwiftUI

struct ContentView : View {

    var body: some View {
        VStack(alignment: .center) {
            VStack(alignment: .center) {
                Image("profile").clipShape(Circle()).shadow(radius: 10)
                Text("Marcin Czachurski").font(.title)
                Text("#iOS/#dotnet developer, #Apple  fanboy").font(.subheadline)
            }

            VStack(alignment: .leading) {

                TitleView(title: "Bio")
                Text("I'm a software developer since almost two decades. I'm working mostly on enterprise applications, however in my free time I'm creating applications for iOS and macOS in my favorite language: Swift. I live in Wrocław/Poland with my lovely wife and daughter.")
                    .font(.subheadline)
                    .fontWeight(.light)
                    .multilineTextAlignment(.leading)
                    .lineLimit(10)

                TitleView(title: "Socials")
                SocialView(icon: "twitter", link: "https://twitter.com/mczachurski")
                SocialView(icon: "medium", link: "https://medium.com/@mczachurski")
                SocialView(icon: "github", link: "https://github.com/mczachurski")

                TitleView(title: "Programming languages")
                HStack {
                    TagView(name: "Swift")
                    TagView(name: "C#")
                    TagView(name: "Typescript")
                }

                TitleView(title: "Portfolio")
                ScrollView(showsHorizontalIndicator: false) {
                    HStack(alignment: .top, spacing: 0) {
                        ApplicationView(icon: "wallpapper",
                                        name: "Wallpapper",
                                        link: "https://github.com/mczachurski/wallpapper")
                        ApplicationView(icon: "vcoin",
                                        name: "VCoin",
                                        link: "https://github.com/mczachurski/vcoin")
                        ApplicationView(icon: "mikroservices",
                                        name: "Mikroservices",
                                        link: "https://github.com/Mikroservices")
                    }
                }.frame(height: 110)
            }.padding(.leading, 15)

            Spacer()
        }
    }
}

struct TagView: View {
    let name: String

    var body: some View {
        HStack {
            Text(name).foregroundColor(Color.white)
        }.padding(5).background(Color.accent, cornerRadius: 8)
    }
}

struct ApplicationView: View {
    let icon: String
    let name: String
    let link: String

    var body: some View {
        VStack {
            Image(icon).cornerRadius(15)
            Text(name).font(.caption)
        }.padding(.trailing, 10)
    }
}

struct TitleView: View {
    let title: String

    var body: some View {
        HStack {
            Text(title).font(.headline)
            Spacer()
        }.padding(.top, 5)
    }
}

struct SocialView: View {
    let icon: String
    let link: String

    var body: some View {
        HStack {
            Image(icon)
            Text(link).font(.subheadline)
        }
    }
}

extension Color {
    static let accent = Color(red: 255/255.0, green: 65/255.0, blue: 129/255.0)
}

#if DEBUG
struct ContentView_Previews : PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
#endif
