//
//  RNBubbleMagneticView.swift
//  react-native-bubble-select
//
//  Created by Jesse Onolememen on 29/03/2020.
//

import Foundation
import UIKit

class RNBubbleMagneticView: UIView {
  var magnetic: Magnetic!
  
  var allowsMultipleSelection: Bool = true {
    didSet {
      magnetic.allowsMultipleSelection = allowsMultipleSelection
    }
  }
  
  var magneticBackgroundColor: UIColor = .white {
    didSet {
      magneticView.backgroundColor = magneticBackgroundColor
      magnetic.backgroundColor = magneticBackgroundColor
    }
  }
  
  var initialSelection: [String] = [] {
    didSet {
      magnetic.nodes.filter {
        self.initialSelection.contains($0.id)
      }.forEach { $0.isSelected = true }
    }
  }
  
  var onSelect: RCTDirectEventBlock?
  var onDeselect: RCTDirectEventBlock?
  
  lazy var magneticView: MagneticView = {
    let magneticView = MagneticView()
    magnetic = magneticView.magnetic
    magnetic.magneticDelegate = self
//    magnetic.scene?.view?.showsFPS = true
//    magnetic.scene?.view?.showsPhysics = true
//    magnetic.scene?.view?.showsNodeCount = true
    magneticView.frame = frame
    magneticView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    return magneticView
  }()
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupView()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupView()
  }
  
  private func setupView() {
    addSubview(magneticView)
    magnetic.calculateAccumulatedFrame()
  }
  
  override public func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
    guard let subview = subview as? RNBubbleSelectNodeView else { return }
    subview.updateNode()
    magnetic.addChild(subview.node)
  }
}

// MARK: - Setters
extension RNBubbleMagneticView {
  @objc func setAllowsMultipleSelection(_ allowsMultipleSelection: Bool) {
    self.allowsMultipleSelection = allowsMultipleSelection
  }
  
  // Stub functions to make sure RN works
  @objc func setOnSelect(_ onSelect: RCTDirectEventBlock?) {
    self.onSelect = onSelect
  }
  
  @objc func setOnDeselect(_ onDeselect: RCTDirectEventBlock?) {
    self.onDeselect = onDeselect
  }
  
  @objc func setMagneticBackgroundColor(_ magneticBackgroundColor: UIColor?) {
    self.magneticBackgroundColor = magneticBackgroundColor ?? .white
  }
  
  @objc func setInitialSelection(_ initialSelection: [String]) {
    self.initialSelection = initialSelection ?? []
  }
}

extension RNBubbleMagneticView: MagneticDelegate {
  func magnetic(_ magnetic: Magnetic, didSelect node: Node) {
    onSelect?([
      "text": node.text ?? "",
      "id": node.id ?? ""
    ])
  }

  func magnetic(_ magnetic: Magnetic, didDeselect node: Node) {
    onDeselect?([
      "text": node.text ?? "",
      "id": node.id ?? ""
    ])
  }
}
